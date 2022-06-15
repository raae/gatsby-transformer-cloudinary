import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';

const SvgTransformed = () => {
  const data = useStaticQuery(graphql`
    query {
      image: file(name: { eq: "cloudinary_logo" }) {
        cloudinary: childCloudinaryAsset {
          fluid(
            transformations: ["e_gamma:100"]
            chained: ["e_grayscale", "t_lwj"]
          ) {
            ...CloudinaryAssetFluid
          }
        }
      }
    }
  `);

  // Duplicate the query so we can display it on the page.
  const query = `
    query {
      image: file(name: { eq: "cloudinary_logo" }) {
        cloudinary: childCloudinaryAsset {
          fluid(
            transformations: ["e_gamma:100"]
            chained: ["e_grayscale", "t_lwj"]
          ) {
            ...CloudinaryAssetFluid
          }
        }
      }
    }
  `
    .replace(/^ {4}/gm, '') // Remove the leading indentation (this is a hack).
    .trim();

  return (
    <div className="image-example">
      <h2>SVG with transformations!</h2>
      <Image fluid={data.image.cloudinary.fluid} alt="Cloudinary logo" />
      <pre>{query}</pre>
    </div>
  );
};

export default SvgTransformed;
