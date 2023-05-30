import HeaderCom from "../components/Header";
import RestaurantCards from "../components/RestaurantCard";
import { PrismaClient, Cuisine, Location, PRICE, Review } from "@prisma/client";

const prisma = new PrismaClient();

export interface RestaurantCardType{
  id: number
  name: string
  main_image: string
  cuisine: Cuisine
  location: Location
  price: PRICE
  slug: string
  reviews: Review
}

const fetchRestaurant = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select:{
      id: true,
      name: true,
      main_image: true,
      slug: true,
      cuisine: true,
      location: true,
      price: true,
      reviews: true
    }
  });
  return restaurants;
};

export default async function Home() {
  const restaurants = await fetchRestaurant();
  // console.log({ restaurants });

  return (
    <main>
      <HeaderCom />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant) => (
          
          <RestaurantCards restaurant={restaurant}/>
        ))}
      </div>
    </main>
  );
}
