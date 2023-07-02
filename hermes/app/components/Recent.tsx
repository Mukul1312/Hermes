import React from "react";
import { Raleway } from "next/font/google";
const raleway = Raleway({
  weight: ["400", "500", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
const url = "https://harsh0p.pythonanywhere.com/recommendation/";
// @ts-ignore
const Recent = ({ type, token }:any) => {
  const [data, setData] = React.useState({
    saved_sms: [],
    saved_email: [],
  });

  React.useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      // reverse the array to show the latest first
      .then((data) => {
        data.saved_email.reverse();
        data.saved_sms.reverse();
        setData(data);
      });
  }, [type, token]);

  console.log(data);
  console.log(type);

  return (
    <div className="flex flex-col gap-y-9">
      <p className={`${raleway.className} font-bold text-center mt-16 text-xl`}>
        Recent Generations #
      </p>
      <div className="max-h-[45vh] overflow-scroll overflow-x-hidden">
        {/* @ts-ignore */}
        {type === "sms"
          ? data.saved_sms.length !== 0 &&
            data.saved_sms.map((item, index) => {
              return (
                <div
                  key={index}
                  className="mx-8 border-2 h-[120px] bg-white overflow-hidden mb-2"
                >
                  {/* @ts-ignore */}
                  <p className="text-sm p-4 overflow-hidden">{item}</p>
                </div>
              );
            })
          : data.saved_email.length !== 0 &&
            data.saved_email.map((item, index) => {
              return (
                <div
                  key={index}
                  className="mx-8 border-2 h-[120px] bg-white overflow-hidden mb-2"
                >
                  {/* @ts-ignore */}
                  <p className="text-sm p-4 overflow-hidden">{item}</p>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Recent;
