import { Loader2 } from 'lucide-react';

type LoadingButton = {
  hasLoading?: boolean;
  children?: React.ReactNode;
}

export default function LoadingButton({
  hasLoading,
  children
}: LoadingButton) {
  if (hasLoading) {
    return (
      <Loader2 className="h-4 w-4 animate-spin" />
    );
  }
  return children;
}
