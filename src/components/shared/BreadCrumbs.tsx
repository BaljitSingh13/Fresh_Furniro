import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Link from "next/link";

const BreadCrumbs = ({crumbs}:any) => {

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/" className="md:text-base xs:text-sm text-black font-medium">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link
                    href={crumbs.link}
                    className="active text-black md:text-base xs:text-sm"
                  >
                    {crumbs.title}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbs;
