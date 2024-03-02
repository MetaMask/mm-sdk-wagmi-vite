import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect, metaMask, type MetaMaskParameters } from 'wagmi/connectors'

const mmSDKParams: MetaMaskParameters = {
  dappMetadata: {
      name: "Example React Dapp",
      url: window.location.href,
  },
  // Other options
}

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'Create Wagmi' }),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
    metaMask({...mmSDKParams}),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
