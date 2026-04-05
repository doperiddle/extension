import { keyringService } from '@/background/service';

import wallet from '../wallet';

const tabCheckin = ({
  data: {
    params: { name, icon }
  },
  session
}) => {
  // Do not trust the origin provided by the web page; it is already set from
  // the trusted port.sender.url in the background connection handler.
  session.name = name;
  session.icon = icon;
};

const getProviderState = async (req) => {
  const {
    session: { origin }
  } = req;

  const isUnlocked = keyringService.memStore.getState().isUnlocked;
  const accounts: string[] = [];
  if (isUnlocked) {
    const currentAccount = await wallet.getCurrentAccount();
    if (currentAccount) {
      accounts.push(currentAccount.address);
    }
  }
  return {
    network: wallet.getLegacyNetworkName(),
    isUnlocked,
    accounts
  };
};

const keepAlive = () => {
  return 'ACK_KEEP_ALIVE_MESSAGE';
};

export default {
  tabCheckin,
  getProviderState,
  keepAlive
};
