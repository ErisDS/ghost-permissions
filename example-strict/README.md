## Strict match

This example show how a stand alone library enforces policies using ABAC library.

In the most basic form, a policy returns a boolean value -- true or false -- to indicate whether
an operation is permitted or not.

Every operation of a resource is controlled by a policy set. See `pap.js`. 

When a client calls a function, we find the policy set matching the resource and operation:
```
abac.authorize(self.subject, browseRequest)
.then(function(policy) {
    return self.blog.getAll(browseRequest, policy.$$responseSchema);
});
```
From the policy set, we find a policy using `firstApplicable` method (by default). 

Each policy has rules defined in `constraints` object. Some properties of the constraints have a 
   special meaning. For example, a policy may define this constraint.
```
constraints: {
   $$roleEquals: 'owner'
}  
```
In this example, this policy is applied if `subject`'s role is `owner`. Constraints also define `$$requestSchema` and `$$responseSchema` like so:
```    
   {
       pid: 'b9f881c0-5519-11e6-a30f-57c744c3a90e',
       name: 'public access',
       effect: 'permit',
       constraints: {
           $$roleEquals: 'public',
           $$requestSchema: {
               "id": "public:/API/Browse:request",
               "type": "object",
               "properties": {
                   "title": {"type": "string"}
               },
               "additionalProperties": false
           },
           $$responseSchema: {
               "id": "public:/API/Browse:response",
               "type": "object",
               "properties": {
                   "title": {"type": "string"},
                   "content": {"type": "string"}
               }
           }
       }
   }
```
If `subject`'s role is public, then the incoming request is expected to conform to the schema in the constraint.

Evaluator validates the incoming request against the schema. If the operation is permitted for the role and the request conforms to the schema, the call to model layer is allowed. 

Response is constructed using the response schema. [More on this later]


