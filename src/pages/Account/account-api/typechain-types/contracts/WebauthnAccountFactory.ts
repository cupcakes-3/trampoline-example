/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface WebauthnAccountFactoryInterface extends utils.Interface {
  functions: {
    "accountImplementation()": FunctionFragment;
    "createAccount(address,uint256[2],uint256)": FunctionFragment;
    "getAddress(address,uint256[2],uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "accountImplementation"
      | "createAccount"
      | "getAddress"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "accountImplementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createAccount",
    values: [
      PromiseOrValue<string>,
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getAddress",
    values: [
      PromiseOrValue<string>,
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "accountImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getAddress", data: BytesLike): Result;

  events: {};
}

export interface WebauthnAccountFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: WebauthnAccountFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    accountImplementation(overrides?: CallOverrides): Promise<[string]>;

    createAccount(
      anEllipticCurve: PromiseOrValue<string>,
      _q: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      salt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAddress(
      anEllipticCurve: PromiseOrValue<string>,
      _q: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  accountImplementation(overrides?: CallOverrides): Promise<string>;

  createAccount(
    anEllipticCurve: PromiseOrValue<string>,
    _q: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    salt: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAddress(
    anEllipticCurve: PromiseOrValue<string>,
    _q: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    salt: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    accountImplementation(overrides?: CallOverrides): Promise<string>;

    createAccount(
      anEllipticCurve: PromiseOrValue<string>,
      _q: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getAddress(
      anEllipticCurve: PromiseOrValue<string>,
      _q: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    accountImplementation(overrides?: CallOverrides): Promise<BigNumber>;

    createAccount(
      anEllipticCurve: PromiseOrValue<string>,
      _q: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      salt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAddress(
      anEllipticCurve: PromiseOrValue<string>,
      _q: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    accountImplementation(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createAccount(
      anEllipticCurve: PromiseOrValue<string>,
      _q: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      salt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAddress(
      anEllipticCurve: PromiseOrValue<string>,
      _q: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      salt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
