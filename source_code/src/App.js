import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from 'react';
import './styles/App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Prototype from "./pages/Prototype";
import Item from "./components/Item";
import Standard from "./pages/Standard";

function App() {
    const initialShelfItems = [
        <Item id={0} location={['A', 0]} itemName="Sweet Popcorn" quantity={1} price={1.90} amount={90} unit='g' image='https://www.simplyrecipes.com/thmb/Xzggu-Md45HKhhYSw4DK8tGlZ_I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Perfect-Popcorn-LEAD-41-4a75a18443ae45aa96053f30a3ed0a6b.JPG' />,
        <Item id={1} location={['B', 3]} itemName="Banana" quantity={1} price={0.30} amount={120} unit='g' image='https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bunch-of-bananas-67e91d5.jpg?quality=90&resize=440,400' />,
        <Item id={2} location={['B', 2]} itemName="Milk" quantity={1} price={1.20} amount={1000} unit='ml' image='https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg' />,
        <Item id={3} location={['D', 3]} itemName="Yoghurt" quantity={1} price={1.39} amount={500} unit='g' image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDVZXpLGU-5tQl23oZH3ZLDfO4eEoucneuI-BjXTlI7Q&s' />,
        <Item id={4} location={['E', 4]} itemName="Oreos" quantity={1} price={1.59} amount={154} unit='g' image='https://s41230.pcdn.co/wp-content/uploads/2019/03/are-oreos-vegan-6-1024x683.jpg' />,
        <Item id={5} location={['D', 5]} itemName="Almonds" quantity={1} price={3.50} amount={200} unit='g' image='https://images.immediate.co.uk/production/volatile/sites/30/2021/02/almonds-9e25ce7.jpg?quality=90&resize=556,505' />,
        <Item id={6} location={['G', 5]} itemName="Orange Juice" quantity={1} price={2.00} amount={1000} unit='ml' image='https://croots.co.uk/wp-content/uploads/2022/10/is-orange-juice-good-for-you-jpg.jpg' />,
        <Item id={7} location={['B', 7]} itemName="Spaghetti" quantity={1} price={0.99} amount={500} unit='g' image='https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/201808/Crack-Control-01_0.jpg?itok=yN-h8Jw6' />,
        <Item id={8} location={['I', 4]} itemName="Chicken Breast" quantity={1} price={6.99} amount={500} unit='g' image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVaDgHCp1135rQ4xVIhGnJnybhUHXeqW7GB9muKdBSYg&s' />,
        <Item id={9} location={['A', 9]} itemName="Green Tea" quantity={1} price={2.50} amount={30} unit='g' image='https://assets.rbl.ms/19152954/origin.jpg' />
    ];

    return (
        <BrowserRouter>
            <Routes>
                <Route index path='' element={<Prototype initialProducts={initialShelfItems} advanced={true}/>} />
                <Route path='/standard' element={<Standard initialProducts={initialShelfItems} advanced={false}/>} />
                <Route index path='/prototype' element={<Prototype initialProducts={initialShelfItems} advanced={true}/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
