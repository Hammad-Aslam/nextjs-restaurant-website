import { PrismaClient } from "@prisma/client";
import Menu from "../../components/Menu";
import RestNavBar from "../../components/RestaurantNavBar";

const prisma = new PrismaClient()
const fetchRestaurantMenu = async (slug: string) =>{
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    select: {
      items: true
    }
  })
  if (!restaurant) {
    throw new Error
  }
  return restaurant.items
}
export default async function Menu1({params}: {params: {slug: string}}) {
  const menu = await fetchRestaurantMenu(params.slug)
  // console.log({menu});
  
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <div className="bg-white w-[100%] rounded p-3 shadow">
          <RestNavBar slug={params.slug}/>
          <Menu menu={menu}/>
        </div>
      </div>
    </>
  );
}
