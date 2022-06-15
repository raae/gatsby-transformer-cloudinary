import React from 'react';
import Layout from '../components/layout';
import SvgDefault from '../examples/svg-default';
import SvgTransformed from '../examples/svg-transformed';

const SvgPage = () => (
  <Layout>
    <h1>SVGs and gatsby-image?!</h1>
    <p>
      Cloudinary can handle SVGs, so we can use ’em with this transformer. No
      special rules apply; just add a SVG like you would any other image.
    </p>
    <div className="examples">
      <SvgDefault />
      <SvgTransformed />
    </div>
  </Layout>
);

export default SvgPage;
