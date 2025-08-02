import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { getLoggedUser } from "src/app/auth/states/auth.selector";
import { Course } from "src/app/models/course.model";
import { User } from "src/app/models/user.model";
import { AppState } from "src/app/store/app.state";
import { environments } from "src/enviroments/environment";

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    constructor(
        private firebaseStorage: AngularFireStorage,
        private http: HttpClient,
    ){
    }

    async uploadImage(image: File) {
        if(image){
            const path = 'courses/images/' + Date.now() + '_' + image.name;
            const uploadTask = await this.firebaseStorage.upload(path, image);
            return await uploadTask.ref.getDownloadURL();
        }
        return '';
    }

    createCourse(course: Course): Observable<{name: string}>{
        const url = `${environments.firebaseConfig.databaseURL}/courses.json`
        return this.http.post<{name: string}>(url, course)
    }

    readCourses(): Observable<Course[]>{
        return this.http.get(
            `${environments.firebaseConfig.databaseURL}/courses.json`
        ).pipe(
            map((data) => {
                const courses: Course[] = [];
                for(let key in data){
                    const course = {...data[key], id: key};
                    courses.push(course);
                }
                return courses;
            })
        );
    }

    updateCourse(course: Course){
        const courseData = {[course.id]: { 
                title: course.title,
                description: course.description,
                author: course.author,
                price: course.price,
                image: course.image,
            }
        }
        return this.http.patch(
            `${environments.firebaseConfig.databaseURL}/courses.json`,
            courseData
        )
    }

    deleteCourse(id: string){
        return this.http.delete(
            `${environments.firebaseConfig.databaseURL}/courses/${id}.json`
        );
    }

    getCourseById(id: string): Observable<Course>{
        return this.http.get<Course>(`${environments.firebaseConfig.databaseURL}/courses/${id}.json`)
    }
}