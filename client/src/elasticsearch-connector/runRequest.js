import axios from 'axios';

export default async body => {
  try {
    const host =
      process.env.NODE_ENV === 'production'
        ? 'http://api.nenu.fr/api/national-parks'
        : '/api/national-parks';
    const response = await axios.post(host, {
      headers: { 'content-type': 'application/json' },
      data: JSON.stringify(body),
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
