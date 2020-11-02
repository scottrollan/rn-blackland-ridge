// const SANITY_KEY = process.env.REACT_APP_SANITY_KEY;
import imageUrlBuilder from '@sanity/image-url';

const sanityClient = require('@sanity/client');
export const Client = sanityClient({
  projectId: 'oe56ky4i',
  dataset: 'production',
  token:
    'skbKhoxaursmUPAigMKQnSM6HYbTJZ0yASm6jPENyE2cl8SuroGqUqSRr4RyRcRb8AV13xpiK5szBkcr87jtXJAqTT8YhIOclIRKLJnJ0qdVgGZ02HU1fOpclixrYnbpr8JN1utUhwd1k6Xhe8BoRarSzdXc9mGmEDHUyhmwXxQB4TI9ym6D',
  useCdn: false, // `false` if you want to ensure fresh data
  ignoreBrowserTokenWarning: true,
});

export const client = sanityClient({
  projectId: 'oe56ky4i',
  dataset: 'production',
  // or leave blank to be anonymous user
  useCdn: false, // `false` if you want to ensure fresh data
});

export const fetchMessages = async () => {
  let response = await Client.fetch(
    "*[_type == 'message'] | order(commentAdded asc)"
  );
  return response;
};

export const fetchSingleMessage = async (id) => {
  let response = await Client.fetch(`*[_type == 'message' && _id == '${id}']`);
  return response;
};

export const fetchReferrals = async () => {
  try {
    let response = await Client.fetch("*[_type == 'referral']");

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDirectory = async () => {
  try {
    let response = await Client.fetch("*[_type == 'profile'] | order(address)");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const patchReactionArray = async (id, reactionArray) => {
  try {
    const res = await Client.patch(id)
      .set({ responses: reactionArray, commentAdded: now })
      .commit();
    console.log(res);
  } catch (error) {
    console.log('Patch failed: ', error.message);
  }
};

export const builderImageUrl = imageUrlBuilder(Client);
