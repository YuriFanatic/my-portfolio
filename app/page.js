import Nav from "@/components/Nav";
import FullscreenCarousel from "@/components/carousel/FullscreenCarousel";
import { WorkspaceProvider } from "@/components/carousel/WorkspaceContext";

export default function Home() {
  return (
    <WorkspaceProvider>
      <Nav />
      <FullscreenCarousel />
    </WorkspaceProvider>
  );
}
