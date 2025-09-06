import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-8 bg-violet-900 pt-9">
      <div className="mx-auto w-full max-w-[1166px] px-4 xl:px-0">
        <div className="flex flex-col justify-between sm:px-[18px] md:flex-row md:px-10">
          {/* Logo + About */}
          <div className="md:w-[316px]">
            <Link to="/">
              <img src="/logo.webp" alt="logo" />
            </Link>
            <p className="mt-[18px] text-[15px] font-normal text-white/80">
              We’re here to make your shopping experience simple, secure, and
              enjoyable. From quality products to reliable support, our priority
              is always you.
            </p>
          </div>

          <div className="flex justify-between gap-20 md:gap-40">
            <div className="flex flex-col gap-2">
              {/* Contact Info */}
              <div className="flex flex-col">
                <p className="text-[12px] font-medium text-white">
                  Support Number
                </p>
                <a
                  href="tel:+918208463693"
                  className="text-[14px] font-medium text-white"
                >
                  +91 8208463693
                </a>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <p className="text-[12px] font-medium text-white">
                  Support Email
                </p>
                <a
                  href="mailto:kartikdhomne1997@gmail.com"
                  className="text-[14px] font-medium text-white"
                >
                  kartikdhomne1997@gmail.com
                </a>
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <p className="text-[12px] font-medium text-white">Address</p>
                <p className="text-[14px] font-medium text-white">
                  Nagpur, Maharashtra, India, 123456
                </p>
              </div>
            </div>

            {/* Pages + Download */}
            <div className="flex w-full flex-col justify-between text-white sm:flex-row md:mt-0 md:max-w-[341px]">
              {/* Pages */}
              <div>
                <p className="text-[18px] font-medium">Pages</p>
                <ul>
                  <li className="mt-4">
                    <Link className="hover:text-white/80" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link className="hover:text-white/80" to="/products">
                      Products
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link className="hover:text-white/80" to="/cart">
                      Cart
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Divider + Copyright */}
        <hr className="mt-[30px] text-white" />
        <div className="flex items-center justify-center pb-8 pt-[9px] md:py-8">
          <p className="text-[10px] md:text-[12px] text-white">
            © Copyright 2025, All Rights Reserved by Kartik Dhomne with ❤️
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
