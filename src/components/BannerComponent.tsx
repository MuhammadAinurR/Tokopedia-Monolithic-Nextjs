import SwiperComponent from "./Swiper";

export default function BannerComponents() {
    const imgList: string[] = [
        "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/8/26/b5346092-9032-4176-99d7-62f11c7b9ada.jpg",
        "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/8/23/5c7d0a0a-274a-44e8-b68e-d1f97bf970ff.jpg",
        "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/8/27/1d65376c-e0fa-4c11-9c30-1658ba58af90.jpg",
        "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/7/26/f71ae750-4dc2-4cbe-ab4b-1a39fa83dbfd.jpg",
        "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/6/27/d00dbb58-ecca-456f-97ac-8eca1f30aeb5.jpg",
    ];
    return (
        <div className="w-full">
            <SwiperComponent imgList={imgList} />
        </div>
    );
}
