import { Karmashree_logo } from "./Logo";
import { Calc_permission } from "../functions/Permissions";
import emblem from "/assets/logo/biswa.png";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, DropdownItem } from "./Dropdown";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { devApi } from "../WebApi/WebApi";
import { fetch } from "../functions/Fetchfunctions";

export const DashboardNavbar = () => {
  const { userIndex, category } = JSON.parse(
    localStorage.getItem("karmashree_User")
  );

  const { data: userDetails, isSuccess } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const data = await fetch.get("/api/user/viewuser/",userIndex);

      return data.data.result
    },
  });

  const districtCode = userDetails?.districtcode;

  const { data: getDistrict } = useQuery({
    queryKey: ["getDistrict"],
    queryFn: async () => {
      const data = await fetch.get(
  
          "/api/mastertable/GetAllDistricts/",
          (userDetails?.districtcode?.length == 1
            ? `0${userDetails?.districtcode}`
            : userDetails?.districtcode)
      );

      return data.data.result[0];
    },
    enabled: Boolean(districtCode),
  });

  const { data: getSubDivision } = useQuery({
    queryKey: ["getSubDivision"],
    queryFn: async () => {
      const data = await axios.get(
        devApi +
          "/api/mastertable/getSubdivison/" +
          (userDetails?.districtcode?.length == 1
            ? `0${userDetails?.districtcode}`
            : userDetails?.districtcode) +
          "/" +
          userDetails?.subDivision
      );

      return data.data.result[0];
    },
    enabled: Boolean(userDetails?.subDivision),
  });

  const { data: getBlock } = useQuery({
    queryKey: ["getBlock"],
    queryFn: async () => {
      const data = await axios.get(
        devApi +
          "/api/mastertable/getBlock/" +
          (userDetails?.districtcode?.length == 1
            ? `0${userDetails?.districtcode}`
            : userDetails?.districtcode) +
          "/" +
          userDetails?.blockCode
      );

      return data.data.result[0];
    },
    enabled: Boolean(userDetails?.blockCode),
  });

  const { data: getGp } = useQuery({
    queryKey: ["getGp"],
    queryFn: async () => {
      const data = await axios.get(
        devApi +
          "/api/mastertable/getonlyGp/" +
          userDetails?.gpCode
      );

      return data.data.result[0];
    },
    enabled: Boolean(userDetails?.gpCode),
  });


  const { data: departmentList } = useQuery({
    queryKey: ["departmentList"],
    queryFn: async () => {
      const data = await axios.get(
        devApi + "/api/mastertable/getDepatmentlist"
      );

      return data.data.result;
    },
    enabled: Boolean(districtCode),
  });  

  
  const navigate = useNavigate();
console.log(Calc_permission(userDetails?.category,userDetails?.role_type,userDetails?.dno_status),"calc")
  return (
    <>
      <div className="p-1 px-16 flex w-screen justify-between border items-center fixed top-0 left-0 z-50 bg-white shadow-lg">
        <Link to={"/dashboard"} className="flex items-center space-x-2 w-fit">
          <div className="flex">
            <Karmashree_logo className="fill-blue-600 h-14 w-fit" />
            <img src={emblem} alt="" className="h-16" />
          </div>
          <div className="flex flex-col -space-y-1">
            <h1 className="capitalize font-semibold text-2xl tracking-tight">
              department of panchayats & rural development
            </h1>
            <h3 className="capitalize text-zinc-500">
              government of west bengal
            </h3>
          </div>
        </Link>

        <Dropdown
          Button={
            <div className="flex justify-center items-center">
              <div className="flex flex-col px-2">
                <div className="text-lg font-bold text-end text-black">
                  {userDetails?.userName}
                </div>
                <span className="text-sm text-end">
                  {userDetails?.category != "BLOCK" &&
                    userDetails?.category != "GP" &&
                    departmentList?.[
                      departmentList?.findIndex(
                        (obj) => obj.departmentNo == userDetails?.departmentNo
                      )
                    ]?.departmentName}{" "}
                  {userDetails?.districtcode == 0 &&
                    userDetails?.category == "HQ" &&
                    "Karmashree Admin"}{" "}
                  {userDetails?.category != "HD" &&
                    userDetails?.category != "HQ" &&
                    userDetails?.districtcode !== 0 &&
                    getDistrict?.districtName}{" "}
                  {userDetails?.subDivision != 0 && getSubDivision?.subdivName}{" "}
                  {userDetails?.blockCode != 0 && getBlock?.blockName}{" "}
                  {userDetails?.category == "BLOCK" &&
                    Boolean(parseInt(userDetails?.dno_status)) &&
                    (userDetails?.category == "BLOCK" ? "BDO" : "DNO")}{" "}
                  {Boolean(parseInt(userDetails?.dno_status)) &&
                    (userDetails?.category == "DIST" ? "DNO" : "")}
                  {Boolean(parseInt(userDetails?.gpCode)) && getGp?.gpName}
                  {" #"}
                  {userIndex}
                </span>
              </div>

              <Icon
                className="text-7xl"
                icon="lets-icons:user-cicrle-duotone"
              />
            </div>
          }
        >
          <div className="h-10 px-5 font-semibold flex-grow flex justify-start items-center">
            <label>{userDetails?.userId}</label>
          </div>
          <DropdownItem
            className="space-x-2"
            onClick={() => navigate("/dashboard/profile")}
          >
            <Icon
              className="text-2xl text-zinc-400"
              icon="material-symbols:settings"
            ></Icon>
            <span>Profile</span>
          </DropdownItem>
          <DropdownItem
            className="space-x-2"
            onClick={() => {
              navigate("/login", { state: "signout" });
              localStorage.removeItem("karmashree_User");
            }}
          >
            <Icon
              className="text-2xl text-zinc-400"
              icon="material-symbols:logout"
            ></Icon>
            <span>Sign out</span>
          </DropdownItem>
        </Dropdown>
      </div>

    </>
  );
};
