import { Outlet } from "react-router-dom";
import NavContainer from "./Views/NavContainer";
import Footer from "./Views/Footer";
import Cart from "./Views/Cart";



function AppWrapper() {


  return (
    <div>
      <main>
        <NavContainer />
        <section>
          <Outlet />
          <Cart />
        </section>
        <Footer />
      </main>
    </div>
  )
}

export default AppWrapper;






