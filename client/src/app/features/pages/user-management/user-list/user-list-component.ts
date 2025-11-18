import { Component, OnInit } from '@angular/core';
import { HighlightPipe } from '../../../../shared/pipes/highlight.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Users } from '../../../../shared/models/interface';
import { UsersService } from '../../../../core/services/users.service';
import { BreadcrumbComponent } from "../../../../shared/components/breadcrumb/breadcrumb-component";
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';

@Component({
  selector: 'app-user-list-component',
  imports: [CommonModule, FormsModule, HighlightPipe, BreadcrumbComponent],
  templateUrl: './user-list-component.html',
  standalone: true,
})
export class UserListComponent implements OnInit {
  users!: Users[];
  currentUser!: Users[] | null;
  editModal: Users | null = null;
  showCompletionModal = false;
  filteredUsers: Users[] = [];
  searchQuery: string = '';

  breadcrumbItems = [{ label: 'Dashboard', link: '/' }, { label: 'Users' }];

  constructor(
    private userService: UsersService,
    private sweetalert: SweetAlertService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filterUsers();
      },
      error: (e) => console.error(e),
    });
  }

  // Filter clintse by name based on the input
  filterUsers(): void {
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  deleteUser(id: number): void {
    this.sweetalert
      .confirmDelete('Are You Sure! You Want to Delete this User?')
      .then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(id).subscribe({
            next: () => {
              this.getAllUsers();
              this.sweetalert.successMessage(
                'Deleted!',
                'The User has been Deleted.'
              );
            },
            error: (error) => {
              console.error('Error deleting User', error);
              this.sweetalert.errorMessage(
                'Error!',
                'There was an error Deleting the User.'
              );
            },
          });
        }
      });
  }

  openModal(): void {
    this.editModal = null;
    this.showCompletionModal = true;
  }

  openEditModal(user: Users): void {
    this.editModal = user;
    this.showCompletionModal = true;
  }

  closeModal(e: boolean): void {
    this.showCompletionModal = false;
    if (e) {
      this.getAllUsers();
    }
  }
}
