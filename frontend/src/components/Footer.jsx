import React from "react";

const Footer = () => {
  return (
    <div className="mt-8 bg-violet-900 pt-9">
      <div className="mx-auto w-full max-w-[1166px] px-4 xl:px-0">
        <div className="flex flex-col justify-between sm:px-[18px] md:flex-row md:px-10">
          {/* Logo + About */}
          <div className="md:w-[316px]">
            <div className="">
              <img src="/logo.webp" alt="logo" />
            </div>
            <p className="mt-[18px] text-[15px] font-normal text-white/80">
              We’re here to make your shopping experience simple, secure, and
              enjoyable. From quality products to reliable support, our priority
              is always you.
            </p>
          </div>

          {/* Contact Info */}
          <div className="md:w-[316px]">
            {/* Phone */}
            <div className="mt-[23px] flex">
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full">
                {/* Phone Icon */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.8472 14.8554L16.4306 12.8764..." fill="white" />
                </svg>
              </div>
              <div className="ml-[18px]">
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
            </div>

            {/* Email */}
            <div className="mt-[23px] flex">
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full">
                {/* Mail Icon */}
                <svg
                  width="20"
                  height="15"
                  viewBox="0 0 20 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 0H1C0.8 0..." fill="white" />
                </svg>
              </div>
              <div className="ml-[18px]">
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
            </div>

            {/* Address */}
            <div className="mt-[23px] flex">
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full">
                {/* Location Icon */}
                <svg
                  width="18"
                  height="21"
                  viewBox="0 0 18 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 4.5C8.25..." fill="white" />
                </svg>
              </div>
              <div className="ml-[18px]">
                <p className="text-[12px] font-medium text-white">Address</p>
                <p className="text-[14px] font-medium text-white">
                  Nagpur, Maharashtra, India, 123456
                </p>
              </div>
            </div>
          </div>

          {/* Pages + Download */}
          <div className="mt-6 flex w-full flex-col justify-between text-white sm:flex-row md:mt-0 md:max-w-[341px]">
            {/* Pages */}
            <div>
              <p className="text-[18px] font-medium">Pages</p>
              <ul>
                <li className="mt-[15px]">
                  <a className="hover:text-white/80" href="/">
                    Home
                  </a>
                </li>
                <li className="mt-[15px]">
                  <a className="hover:text-white/80" href="/our-tutors">
                    News
                  </a>
                </li>
                <li className="mt-[15px]">
                  <a className="hover:text-white/80" href="/become-a-tutor">
                    Contact
                  </a>
                </li>
              </ul>
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
