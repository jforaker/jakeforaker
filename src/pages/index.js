import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Button from '../components/button';

class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <h4>Who?</h4>
        <h4>
          Lead Mobile Engineer at <code>Brainscape</code>.
        </h4>
        <h4>
          Currently interested in all things react-native.
          When I'm not writing code, I enjoy eating spicy foods, photography,
          playing guitar, and creating art.
        </h4>

        <div>
          <span role="img" aria-label="wave emoji">
            🤙
          </span>
        </div>
        <Link to="/blog/">
          <Button marginTop="35px">Go to Blog</Button>
        </Link>
      </Layout>
    );
  }
}

export default IndexPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
