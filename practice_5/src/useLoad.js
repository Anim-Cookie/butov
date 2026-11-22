import { useState, useEffect, useCallback } from 'react';

export function useLoad(loadFn, ...args) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  const reload = useCallback(() => {
    setAttempt((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function run() {
      setLoading(true);
      setError(null);

      try {
        const res = await loadFn(...args, signal);
        if (!signal.aborted) {
          setData(res);
          setLoading(false);
        }
      } catch (err) {
        if (!signal.aborted) {
          setError(err.message || 'Ошибка загрузки');
          setLoading(false);
        }
      }
    }

    run();

    return () => {
      controller.abort();
    };
    }, [loadFn, attempt, JSON.stringify(args)]);

  return { data, loading, error, reload };
}
