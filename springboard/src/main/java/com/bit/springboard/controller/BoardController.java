package com.bit.springboard.controller;

import com.bit.springboard.dto.BoardDTO;
import com.bit.springboard.dto.ResponseDTO;
import com.bit.springboard.entity.Board;
import com.bit.springboard.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/board")
public class BoardController {
    private BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }


    @GetMapping("/board-list")
    public ModelAndView getBoardList() {
        ModelAndView mv = new ModelAndView();

        List<Board> boardList = boardService.getBoardList();

        List<BoardDTO> boardDtoList = new ArrayList<BoardDTO>();

            for(Board b : boardList) {
                BoardDTO returnBoardDTO = BoardDTO.builder()
                                                  .boardNo(b.getBoardNo())
                                                  .boardTitle(b.getBoardTitle())
                                                  .boardContent(b.getBoardContent())
                                                  .boardWriter(b.getBoardWriter())
                                                  .boardRegDate(b.getBoardRegdate().toString())
                                                  .boardCnt(b.getBoardCnt())
                                                  .build();

                boardDtoList.add(returnBoardDTO);
            }

            mv.addObject("boardList", boardDtoList);
            mv.setViewName("board/getBoardList.html");
            return mv;
        }


    @PostMapping("/board")
    public ResponseEntity<?> insertBoard(BoardDTO boardDTO) {
        ResponseDTO<Map<String, String>> responseDTO =
                    new ResponseDTO<Map<String, String>>();

        try {
            Board board = Board.builder()
                            .boardTitle(boardDTO.getBoardTitle())
                            .boardContent(boardDTO.getBoardContent())
                            .boardWriter(boardDTO.getBoardWriter())
                            .build();

            boardService.insertBoard(board);

            Map<String, String> returnMap =
                    new HashMap<String, String>();

            returnMap.put("msg", "정상적으로 저장되었습니다.");

            responseDTO.setItem(returnMap);

            return ResponseEntity.ok().body(responseDTO);
        } catch(Exception e) {
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            responseDTO.setErrorMessage(e.getMessage());

            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
}
