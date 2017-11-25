import {NgModule} from '@angular/core';

import { LazyComponent } from 'app/lazy.component';

@NgModule({
  declarations: [LazyComponent],
  entryComponents: [LazyComponent],
  providers: [ { provide: 'LAZY_ENTRY_POINT', useValue: LazyComponent } ],
})
export class LazyModule {}
