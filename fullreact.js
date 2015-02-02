(function(ctx) {
  ctx.Fullreact = new Class ({
    initialize: function(model) {
      var that = this;
      this.model = model;

      _.each(model, function(param, key) {
        if (param instanceof Mongo.Collection) {
          var collection = param;
          var update = function() {that.updateModelData(collection, key);};

          collection.find().observe({
            added: update,
            changed: update,
            removed: update
          });
          that.updateModelData(collection, key);
        }
      });
    },

    getModel: function() {
      return this.model;
    },

    updateModelData: function(collection, key) {
      this.model[key] = collection.find().fetch();
      this._observeCollection(collection, key);
    },

    _observeCollection: function(collection, key) {
      var that = this;
      var model = this.model;
      var collectionArray = model[key];
      var errorHandler = function(error, result) {
        if (error) {
          that.updateModelData(collection, key);
          error.collection = collection;
          error.name = key;
          model.errors.push(error);
        }
      };

      var observer = new ArrayObserver(collectionArray);
      observer.open(function(splices) {
        splices.forEach(function(splice) {
          // Insert
          if (splice.addedCount) {
            collection.insert(collectionArray[splice.index], errorHandler);
          }
          // Remove
          splice.removed.forEach(function(obj) {
            collection.remove(obj._id, errorHandler);
          });
        });
      });
    }
  });
})(this);
