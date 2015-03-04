Full react transforms every collection in a list into an reactive array
using observe-js

Instalation
```  
meteor add purepattern:fullreact
```


Example:

```  
mymodel = FullReact({
  tvs: Tvs
}).getModel();
```
This two calls react from server.

```  
  mymodel.tvs.push({name: 'tv name'});
  mymodel.tvs.pop();
```
