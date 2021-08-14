import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

const useFetchApi = (url: string = '', options: any = null) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted: boolean = true;

    setLoading(true);
    axiosClient()
      .get(url, options)
      .then((res) => {
        if (isMounted) {
          setError(null);
          setData(res.data);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setData(null);
          setError(error);
        }
      })
      .finally(() => {
        isMounted && setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [url, options]);

  return { data, error, loading };
};

export default useFetchApi;
