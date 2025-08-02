import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Update } from "@ngrx/entity";
import { map, Observable } from "rxjs";
import { Course } from "src/app/models/course.model";
import { environments } from "src/enviroments/environment";

@Injectable()
export class CourseDataService extends DefaultDataService<Course> {
    constructor(
        http: HttpClient,
        httpUrlGenerator: HttpUrlGenerator
    ) {
        super('Course', http, httpUrlGenerator)
    }

    override getAll(): Observable<Course[]> {
        return this.http.get(
            `${environments.firebaseConfig.databaseURL}/courses.json`
        ).pipe(
            map((data) => {
                const courses: Course[] = [];
                for (let key in data) {
                    const course = { ...data[key], id: key };
                    courses.push(course);
                }
                return courses;
            })
        );
    }

    override add(entity: Course): Observable<Course> {
        const url = `${environments.firebaseConfig.databaseURL}/courses.json`
        return this.http.post<{name: string}>(url, entity).pipe(
            map(data => {
                return { ...entity, id: data.name }
            })
        )
    }

    override update(update: Update<Course>): Observable<Course> {
         return this.http.put<Course>(
            `${environments.firebaseConfig.databaseURL}/courses/${update.id}.json`,
            { ...update.changes }
        )
    }

    override delete(id: string): Observable<string> {
        return this.http.delete(
            `${environments.firebaseConfig.databaseURL}/courses/${id}.json`
        ).pipe(
            map(data => {
                return id;
            })
        );
    }
}