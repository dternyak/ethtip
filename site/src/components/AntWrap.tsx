import React from 'react';
import { Layout } from 'antd';
import BasicHead from './BasicHead';


export interface Props {
  title: string;
  isFullScreen?: boolean;
  withBreadcrumb?: boolean | null;
  centerContent?: boolean;
}

const { Content } = Layout;

class AntWrap extends React.Component<Props> {
  render() {
    const {
      children,
      centerContent,
    } = this.props;
    return (
      <BasicHead>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Content
            style={{
              display: 'flex',
              justifyContent: 'center',
              flex: 1,
              // padding: isFullScreen ? '0' : '0 2.5rem',
            }}
          >
            <div
              style={{
                width: '100%',
                // paddingTop: isFullScreen ? 0 : 50,
                // paddingBottom: isFullScreen ? 0 : 50,
                minHeight: 280,
                alignSelf: centerContent ? 'center' : 'initial',
              }}
            >
              {children}
            </div>
          </Content>
        </div>
      </BasicHead>
    );
  }
}
export default AntWrap;
