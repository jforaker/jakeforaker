import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Button from '../components/button';

class IndexPage extends React.Component {
  render() {
    const siteTitle = 'Jake Foraker'; // : another ___ Blog

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        {/* <img style={{ margin: 0 }} src="./GatsbyScene.svg" alt="Gatsby Scene" /> */}
        <h4 style={{ textTransform: 'none' }}>
          Who?
          <br /> <br />
          I'm a software developer currently working at CNN.
          <br /> <br />
          Some topics that interest me currently are react-native and GraphQL.
          When I'm not writing code, I enjoy eating spicy foods, photography,
          playing guitar, and creating art.
          <br /> <br />
          <span role="img" aria-label="wave emoji">
             🤙
          </span>
        </h4>
        <Link to="/blog/">
          <Button marginTop="35px">Go to Blog</Button>
        </Link>
      </Layout>
    );
  }
}

export default IndexPage;
