import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { getLoggedUser } from "../states/auth.selector";
import { map } from "rxjs";


export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const store: Store = inject(Store);
    const router: Router = inject(Router);

    return store.select(getLoggedUser).pipe(
        map((user) => {
            if(!user){
                return router.createUrlTree(['auth', 'login']);
            } else{
                return true;
            }
        })
    )
}