import { useEffect, useState, ReactNode } from "react";

interface ClientOnlyProps {
  children: ReactNode;
}

/*
 * This component must wrap all others that uses client side rendering only.
 * See https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/
 */

export default function ClientOnly({ children, ...delegated }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}
