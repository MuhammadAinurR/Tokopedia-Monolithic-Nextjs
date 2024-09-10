import BannerComponents from "@/components/BannerComponent";
import FeaturedProduct from "@/components/FeaturedProduct";
import InfoComponent from "@/components/InfoComponent";
import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow overflow-y-scroll">
                <div className="flex justify-center py-3 h-full">
                    <div className="w-[64%] h-full">
                        <div className="w-full h-full">
                            <BannerComponents />
                            <FeaturedProduct />
                            <InfoComponent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
