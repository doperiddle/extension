import QRCode from 'qrcode.react';

import { DONATION_ADDRESS } from '@/shared/constant';
import { Column, Content, Header, Layout, Row, Text } from '@/ui/components';
import { copyToClipboard } from '@/ui/utils';
import { useTools } from '@/ui/components/ActionComponent';
import { Icon } from '@/ui/components/Icon';
import { sizes } from '@/ui/theme/spacing';

export default function DonateScreen() {
  const tools = useTools();

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Donate"
      />
      <Content>
        <Column gap="xl" mt="lg">
          <Text text="Support this project by donating BTC:" preset="regular" textCenter />
          <Column
            justifyCenter
            rounded
            style={{ backgroundColor: 'white', alignSelf: 'center', alignItems: 'center', padding: 10 }}>
            <QRCode value={DONATION_ADDRESS} renderAs="svg" size={sizes.qrcode} />
          </Column>
          <Row
            justifyCenter
            itemsCenter
            gap="sm"
            onClick={() => {
              copyToClipboard(DONATION_ADDRESS).then(() => {
                tools.toastSuccess('Copied');
              });
            }}
            style={{ cursor: 'pointer' }}>
            <Icon icon="copy" color="textDim" />
            <Text text={DONATION_ADDRESS} preset="sub" color="textDim" style={{ wordBreak: 'break-all' }} />
          </Row>
        </Column>
      </Content>
    </Layout>
  );
}
