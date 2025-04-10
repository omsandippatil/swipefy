
import { useEffect } from 'react';
import SwipeMusicApp from '@/components/SwipeMusicApp';

const Index = () => {
  useEffect(() => {
    document.title = "Swipefy | Discover Music";
  }, []);
  
  return <SwipeMusicApp />;
};

export default Index;
