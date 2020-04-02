import axios from 'axios';

export default async body => {
  console.log(body);
  try {
    const response = await axios.post('/api/national-parks', {
      headers: { 'content-type': 'application/json' },
      data: JSON.stringify(body),
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
