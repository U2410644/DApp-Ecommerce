import React from 'react';
import productsData from '../data/productsData';
import ProductsCard from '../components/ProductsCard';
import WalletBalance from '../components/WalletBalance';

const Home = () => {
    return (
        <>
            <section id="home">
                <div className="container">
                    <div className="center">
                        <WalletBalance/>

                    </div>
                    <div className="home_content">
                        {
                            productsData.map((item) => (
                                <ProductsCard key={item.id} {...item} />
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;