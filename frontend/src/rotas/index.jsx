import {Routes, Route} from "react-router-dom";
import BaseLayout from "../layout/BaseLayout";
import CreatePerson from "../pages/CreatePerson";
import UpdatePerson from "../pages/UpdatePerson";
import ListPeople from "../pages/ListPeople";


const AppRotas = () => {
    return (
        <Routes>
            <Route element={<BaseLayout />}>
                <Route path="/" exact element={<CreatePerson />} />
                <Route path="/update-user" element={<UpdatePerson />} />
                <Route path="/list-people" exact element={<ListPeople />} />
            </Route>
        </Routes>
    )
}

export default AppRotas;