import { createRandomString } from '../functions/CreateRandomString';

let randomAvatar;
let randomStr = createRandomString(8);
try {
  fetch(`https://robohash.org/${randomStr}.png?bgset=bg1`)
    .then((response) => response.blob())
    .then(async (blob) => {
      randomAvatar = blob;
    });
} catch (error) {
  console.log(error);
}
export { randomAvatar };
