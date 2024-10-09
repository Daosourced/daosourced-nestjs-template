import { ModuleRefHolder } from "@daosourced/nestjs-common";
import { Global, Module, Provider } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";

const providers: Provider[] = [
  {
    provide: "MODULE_REF_HOLDER", // Must use literal token
    useFactory: (moduleRef) => {
      return new ModuleRefHolder(moduleRef);
    },
    // Must inject ModuleRef from direct dependency of main application code
    inject: [ModuleRef],
  },
];

@Global()
@Module({
  providers: providers,
  exports: providers,
})
export class CommonModule {}
