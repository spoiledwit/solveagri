import React, { useState, useEffect } from 'react';
import AnimateToView from './AnimateToView';
import LoadingButton from './Button/LoadingButton';
import Link from 'next/link';

const CountUpNumber = ({ end, duration = 2000 }:{
  end: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
        setHasAnimated(true);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end, duration, hasAnimated]);

  return (
    <h1 className="text-[24px] text-DG">
      {count.toLocaleString()}
      {end > 1000 ? 'K+' : '+'}
    </h1>
  );
};

export default function About() {
  return (
    <>
      <div className='md:block lg:flex items-start md:items-center justify-start md:justify-center px-2 md:px-8'>
        <div className="md:py-20 py-10 px-4 md:px-16">
          <AnimateToView className="w-full">
            <h1 className="md:text-[30px] text-[30px] text-DG">We handle everything for you.</h1>
          </AnimateToView>
          <div className="flex mt-5">
            <div>
              <AnimateToView className="w-full">
                <p className="text-DG ml-0 md:ml-8 text-lg md:text-xl font-light">
                  <strong className="font-semibold">Solve Agri Pak:</strong>{" "}
                  Empowering livestock success through proven solutions and community
                  development. We assist farmers in optimizing productivity and
                  resources. Our commitment lies in sustainable practices, fostering
                  community growth, and ensuring animal welfare. Trust us as your
                  partner for livestock excellence.
                </p>
              </AnimateToView>
              <AnimateToView className="grid grid-cols-2 md:grid-cols-4 gap-16 mt-12">
                <div>
                  <CountUpNumber end={100} />
                  <p className="text-lg md:text-xl font-light text-DG">Customers</p>
                </div>
                <div>
                  <CountUpNumber end={50} />
                  <p className="text-lg md:text-xl font-light text-DG">Products</p>
                </div>
                <div>
                  <CountUpNumber end={1000} />
                  <p className="text-lg md:text-xl font-light text-DG">Consultancies</p>
                </div>
                <div>
                  <CountUpNumber end={100} />
                  <p className="text-lg md:text-xl font-light text-DG">Projects</p>
                </div>
              </AnimateToView>
              <div className="max-w-[200px] mt-10">
                <Link href="/aboutus" passHref>
                  <LoadingButton isLoading={false} text="See Company" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <img className='w-screen lg:w-full pb-5 lg:pb-0' src="/aboutt.png" alt="" />
      </div>
    </>
  );
}