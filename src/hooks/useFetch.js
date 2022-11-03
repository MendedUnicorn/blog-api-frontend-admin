import { useState, useEffect } from 'react';

export const useFetch = (url, trigger) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url, {
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [url, trigger]);
  return { data, error, loading };
};
