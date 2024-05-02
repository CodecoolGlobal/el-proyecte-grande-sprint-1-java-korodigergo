package com.codecool.men.repository;

import com.codecool.men.repository.model.Note;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByUserId(Long user_id);

    Note findByIdAndUserId(Long id, Long user_id);
}
