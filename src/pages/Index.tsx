
import { useEffect } from 'react';
import SwipeMusicApp from '@/components/SwipeMusicApp';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    document.title = "Swipefy | Discover Music";
    
    // Welcome message
    setTimeout(() => {
      toast({
        title: `Welcome to Swipefy`,
        description: isMobile 
          ? "Swipe cards or use the buttons to discover new music and build your collection" 
          : "Explore our enhanced experience with library access, analytics, and similar artists",
        className: "glass-strong border border-white/15 bg-gradient-to-r from-primary/20 to-transparent shadow-xl",
        duration: 5000,
      });
    }, 1000);
  }, [toast, isMobile]);
  
  return (
    <div className="min-h-screen overflow-hidden grid-pattern">
      <SwipeMusicApp />
    </div>
  );
};

export default Index;
