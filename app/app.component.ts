import {
  Component,
  Inject,
  Injector,
  NgModuleFactoryLoader,
  ViewContainerRef,
} from '@angular/core';
import { Route, ROUTES } from '@angular/router';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private lazyPath: Route;

  constructor(
    private loader: NgModuleFactoryLoader,
    private injector: Injector,
    private viewRef: ViewContainerRef,
    @Inject(ROUTES) loadablePaths: Route[][],
  ) {
    // flatten out the providers
    const paths = loadablePaths.reduce((a, b) =>  a.concat(b));
    this.lazyPath = paths.find((r) => r.path === 'lazy');
  }

  public onClick() {
    this.loader.load(this.lazyPath.loadChildren as string)
      .then((factory) => {
        const module = factory.create(this.injector);
        const entryComponentType = module.injector.get('LAZY_ENTRY_POINT');
        const componentFactory = module.componentFactoryResolver.resolveComponentFactory(
          entryComponentType,
        );
        this.viewRef.createComponent(componentFactory);
      });
  }
}
