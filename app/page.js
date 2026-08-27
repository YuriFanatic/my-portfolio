import Nav from "@/components/Nav";
import FullscreenCarousel from "@/components/carousel/FullscreenCarousel";
import { SelectorProvider } from "@/components/carousel/SelectorContext";

export default function Home() {
  return (
    <SelectorProvider>
      <Nav />
      <FullscreenCarousel />
    </SelectorProvider>
  );
}
