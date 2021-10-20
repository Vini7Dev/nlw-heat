import { serverHttp } from "./app";

serverHttp.listen(3333, () => {
    console.log('===> Server started on PORT 4000 <===');
});
