import Products from "../components/Products";
import Logo from "../components/Logo";

function Home() {
  return (
    <div className="grid grid-rows-[16rem,1fr] gap-10 bg-slate-50">
      <Logo />
      <Products />
    </div>
  );
}

export default Home;
