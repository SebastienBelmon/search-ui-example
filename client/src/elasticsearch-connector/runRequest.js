import axios from 'axios';

export default async body => {
  try {
    const response = await axios.get('/api/national-parks', {
      headers: { 'content-type': 'application/json' },
      data: {
        query: {
          match_all: {},
        },
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
