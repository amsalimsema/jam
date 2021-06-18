import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";
import Head from "next/head";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "recipe" });

  return {
    props: {
      recipes: res.items,
    },
    revalidate: 1,
  };
}

export default function Recipes({ recipes }) {
  // console.log(recipes);

  return (
    <>
      <Head>
        <title>Just Add Marmite</title>
        <meta property="og:title" content="Just Add Marmite" key="title" />
      </Head>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.sys.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}
