import { notFound } from "next/navigation";
import Descripition from "../components/Descripition";
import Images from "../components/Images";
import Rating from "../components/Rating";
import ReservationCard from "../components/Reservation";
import RestNavBar from "../components/RestaurantNavBar";
import Reviews from "../components/Review";
import Title from "../components/Title";
import { PrismaClient, Review } from "@prisma/client";

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  reviews: Review[]
}
const prisma = new PrismaClient();
const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true
    },
  });
  if (!restaurant) {
    notFound()
  }
  return restaurant;
};
export default async function Restaurant({
  params,
}: {
  params: { slug: string };
}) {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  console.log({ restaurant });

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestNavBar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={restaurant.reviews}/>
        <Descripition description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.reviews}/>
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  );
}
