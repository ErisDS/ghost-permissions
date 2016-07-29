## Policies with pre/post filters

This model is more forgiving than the model presented in `example1`. In this model, 
when a `subject` with role **R<sub>k</sub>** requests data say `SELECT * FROM posts` (or its equivalent), 
we look up policies applicable to role **R<sub>k</sub>** and append any restrictions. For e.g., the above
query would be translated to `SELECT {filtered attributes} FROM posts WHERE {filter expression} ` 
where `{filtered attributes}` and `{filter expression}` is declared in the matching policy definition.

